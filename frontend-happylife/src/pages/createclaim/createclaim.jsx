import {Link} from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import Select from 'react-select'
import axios from 'axios'
//import {BsFillTrashFill,BsFillPencilFill} from 'react-icons/bs'
import CreateClaimModal from './createclaimmodal.jsx'
import Modalerror from './modalerror.jsx'
import Modalerrorfile from './modalerrorfile.jsx'
import Modalsuccess from './modalsuccess.jsx'
import Addinvoiceclaim  from './addinvoiceclaim.jsx';
import RegistrationAPI from '../../../api/registrationApi.jsx';
import { useParams } from 'react-router-dom'

export default function CreateClaim() { 
    const user = useSelector((state) => state.auth.login.currentUser);

    const {regisId} = useParams();
    console.log('regisID:',regisId)
    const [registrations, setRegistrations] = useState(null);
    //const [claims, setClaims] = useState(null);
    const [content,setContent] =useState('');
    //const [invoice,setInvoice] = useState([]);
    //const [amount,setAmount] =useState(0); 
    const [hospitalName,setHospitalName] =useState('');

    const [modalOpen,setModalOpen] = useState(false);
    const [modalErrorOpen,setModalErrorOpen] = useState(false);
    const [modalErrorFileOpen,setModalErrorFileOpen] = useState(false);
    const [modalSuccessOpen,setModalSuccessOpen] = useState(false);
    

    const [rows,setRows] = useState( [

    ]);

    const categoriesOption = [
        {value:"Bảo hiểm sức khỏe căn bản",label:"Bảo hiểm sức khỏe căn bản"},
        {value:"Bảo hiểm sức khỏe thông dụng",label:"Bảo hiểm sức khỏe thông dụng"},
        {value:"Bảo hiểm sức khỏe nâng cao",label:"Bảo hiểm sức khỏe nâng cao"},
        {value:"Bảo hiểm sức khỏe đặc biệt",label:"Bảo hiểm sức khỏe đặc biệt"},
        {value:"Điều trị ngoại trú",label:"Điều trị ngoại trú"},
        {value:"Điều trị nha khoa",label:"Điều trị nha khoa"},
        {value:"Sinh mạng cá nhân",label:"Sinh mạng cá nhân"},
        {value:"Tai nạn cá nhân",label:"Tai nạn cá nhân"},

    ];
    
    //claim
    const [claimCategories,setClaimCategories] =useState([]);
    const fetchRegistrations = async () => {
        console.log('userID:',user.userInfo.id)
        const url =`http://localhost:8090/api/v1/registrations/${user.userInfo.id}`
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => {
                console.log('Regis:', response.data);
                setRegistrations(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
        
    }
    // const fetchClaims =async () => {
    //     const url = `http://localhost:8090/api/v1/claims/${user.userInfo.id}`;
    //     axios.get(url, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     })
    //         .then(response => {
    //             console.log('Claim:', response.data);
    //             setClaims(response.data)
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
        
    // }
    const [files, setFiles] = useState([]);
    const [isImageFile, setIsImageFile] = useState(false);
    let url1;


  const handleFileChange = (event) => {
    const inputFile = event.target.files;
    console.log('inputfile:',inputFile);
    console.log('inputfile:',inputFile[0].name);
    if (inputFile[0].name.includes('.pdf') == true){
        console.log('inputfile:',inputFile[0].name.includes('.pdf'));
        setIsImageFile(false);
    } else {
        setIsImageFile(true);
    }
    setFiles(inputFile);
    
  };
    const handleClaimCategoriesChange = (selectCategories) => {
        const selectedValues = selectCategories.map(option => option.value);
        setClaimCategories(selectedValues);
        console.log('Select Categories:',selectCategories)
        console.log('choose :',claimCategories)
                    
        // const isSelect = claimCategories.includes(selectCategories)
        
        // if(isSelect)
        // {
        //     setClaimCategories((prev) => prev.filter((item) => item !== selectCategories));
            
        // }else{
        //     setClaimCategories((prev) => [...prev, selectCategories]);
        // }
        // console.log('active', isSelect);
        // console.log('choose', selectCategories);
    }


    const handleDeleteRow = (targetIndex) => {
        setRows(rows.filter((_,index) => index !== targetIndex))
    }

    const handleAddRow = (newRow) => {
        setRows([...rows,newRow])
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("//////////////////////////////////////////////////////////")
        console.log('regisID in submit:',regisId)
          const selectedRegistration = registrations.find(registration => registration.regisId === regisId);
            console.log('Select Regis:',selectedRegistration)
            console.log('Select claimCategories:',claimCategories)
            console.log('Select rows:',rows)
          if (!selectedRegistration) {
            console.error("Selected registration not found");
            return;
          }

          if (claimCategories.length == 0 || rows.length == 0) {
            console.log('Error: claimCategories or rows is null');
            setModalErrorOpen(true);
            return;
          }
      
          const claim = {
            regisInfo: selectedRegistration,
            claimCategories: claimCategories,
            content: content,
            claimInvoices:rows,
            hospitalName: hospitalName,
          };
          console.log('hello')


        const url = 'http://localhost:8090/api/v1/claims/create';
        axios.post(url, claim, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
        })
        .then(response => {
            console.log('Success:', response.data);
            const newClaimId = response.data.claimId;
            
            //console.log('Current: ',curentRegistrations)
            console.log('123:', newClaimId);

                    const fileCounts = [{section:"Insurant:",fileCount:files.length}];

                    console.log('true/false: ',isImageFile)
                    if(isImageFile==true){
                        url1 =`http://localhost:8090/api/v1/claims/update/${newClaimId}/image-docUrl`;
                    }
                    else {
                        url1 =`http://localhost:8090/api/v1/claims/update/${newClaimId}/file-docUrl`;
                    }
                    console.log('URL: ',url1)
                    const formData = new FormData();

                    formData.append('fileCounts', JSON.stringify(fileCounts))
                    for (let i = 0; i < files.length; i++) {

                      formData.append('files', files[i]);
                    }

                    //console.log('file url: ',fileURL)
                    axios.put(url1, formData, 
                    {
                      headers: {
                        'Content-Type': 'multipart/form-data',

                      }
                    })
                      .then(response => {
                        console.log('Success:', response.data);
                        console.log('file: ',files);
                        console.log('FormData: ',formData)
                        setModalSuccessOpen(true)
                        // Handle the response as needed
                      })
                      .catch(error => {
                        console.error('Error:', error);
                        console.log('file: ',files);
                        console.log('FormData: ',formData)
                        setModalErrorFileOpen(true)
                        // Handle errors
                      });
                   
  
        })
        .catch(error => {
            console.error('Error:', error);
        });
       
        }
    
        useEffect(() => {
            fetchRegistrations();
            // fetchClaims();
           
        }, [regisId]); 
    
    return(
        <div className="py-20 bg-custom-blue-3 ">
        
        <div className="mt-10 pt-6 pb-14 container mx-auto bg-white">
          <div className="py-10 w-auto text-center text-blue-950 text-5xl font-medium font-['IBM Plex Serif'] leading-[56px]">Send Your Claim</div>

          <form onSubmit={handleSubmit} className="pt-6 pb-4  container mx-auto pl-24 pr-24 max-w-6xl  ">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ">
                  <div className="sm:col-span-full">   
                        <label className="block text-xl font-medium leading-6 text-gray-900">
                          Reason
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full h-10 px-4 border-0 py-2 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xl focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder='Your reason'
                            onChange={(e)=>setContent(e.target.value)}
                        />
                        </div>
                  </div>
                  <div className="pt-10 ">

                        <Select options={categoriesOption} onChange={handleClaimCategoriesChange} isMulti/>
                    </div>

                    <div className="sm:col-span-full">   
                        <label className="block text-xl font-medium leading-6 text-gray-900">
                            Hospital Name
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full h-10 px-4 border-0 py-2 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xl focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder='Your reason'
                            onChange={(e)=>setHospitalName(e.target.value)}
                        />
                    </div>
                    {/* claimInvoices table */}
                    <Addinvoiceclaim rows={rows} deleteRow={handleDeleteRow}/>
                    <div className="flex justify-center pt-5">
                        <button type="button" onClick={ () => setModalOpen(true)} className=" flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                    </div>
                    {modalOpen && <CreateClaimModal closeModal={() => {setModalOpen(false)}}  onSubmit={handleAddRow}  className="pt-5"/>}
                    
                    {modalErrorOpen && <Modalerror closeModal={() => {setModalErrorOpen(false)}}/>}
                    {modalErrorFileOpen && <Modalerrorfile closeModal={() => {setModalErrorFileOpen(false)}}/>}
                    {modalSuccessOpen && <Modalsuccess closeModal={() => {setModalSuccessOpen(false)}}/>}
                    
                    <input type="file" onChange={handleFileChange} multiple className='pt-10' />
                    <div className="flex items-center justify-between">
                            <div></div>
                            <button  className="px-32 py-6 text-2xl flex flex-row bg-indigo-50 rounded border font-bold font-['IBM Plex Sans'] text-custom-blue-3 border-indigo-500">
                                <p className="pl-6">Sent</p>
                            </button>
                        </div>
                  </div>
             </div>
             
                 
          </form>

                                                
          {/* test get registion */}
          {/* {registrations?.map((item, index) => (
            <div key={index}>
                <div className="border-t border-gray-300 pl-8 pr-2 py-2">{index + 1}</div>
                <div >{item.customerInfo.fullName}</div>
                <div >{item.customerInfo.phoneNumber}</div>
                
                <div >{item.customerInfo.dob}</div>
                <div >{item.customerInfo.address}</div>
                <div >{item.productInfo.planName}</div>
                <div >{item.productInfo.planServiceCoverage}</div>
                <div >{item.productInfo.planDuration + " " + item.productInfo.planDurationUnit + "s"}</div>
                
            </div>
            ))} */}

            
        </div>
        
      </div>

    );
    
}
