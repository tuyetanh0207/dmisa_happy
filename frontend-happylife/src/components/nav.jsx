import { Disclosure } from '@headlessui/react';
import {logo} from '../assets/logo.png';
const Nav = () => {
  // Your navigation items, logo, etc.

  return (
    <header>
      <nav>
        <img src={logo} alt="Logo" />
        Home
        About
        Plan 
        Contact
      </nav>

      <Disclosure as="nav" className="sm:hidden">
        {() => (
          <>
            <Disclosure.Button>
              {/* Your button to toggle the navigation */}
            </Disclosure.Button>

            <Disclosure.Panel>
              <div className="space-y-1 px-2 pb-3 pt-2">
                {/* Your navigation links */}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
};

export default Nav;
