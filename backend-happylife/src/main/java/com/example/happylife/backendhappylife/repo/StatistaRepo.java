package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.Statista;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StatistaRepo extends MongoRepository<Statista, ObjectId> {


    Statista findByYear(Integer year);

    // Increment 'numOfInsuranceRegistration' in InsuranceStatista by 1


    @Query("{ 'year' : ?0}")
    @Update("{ '$inc' : { 'insuranceStatista.numOfInsuranceRegistration' : 1, 'monthStatistas.$[elem].insuranceStatista.numOfInsuranceRegistration' : 1} }")
    void incrementNumOfInsuranceRegistration(Integer year, @Param("elem") Integer monthIndex, @Param("arrayFilters") List<Object> arrayFilters);
//, 'monthStatistas.$[month-1].insuranceStatista.numOfInsuranceRegistration' : 1
    @Query("{ 'year' : ?0 }")
    @Update("{ '$inc' : { 'insuranceStatista.numOfExpiredRegistration' : 1, 'monthStatistas.$[month-1].insuranceStatista.numOfExpiredRegistration' : 1 } }")
    void incrementNumOfExpiredRegistration(Integer year, Integer month);

    @Query("{ 'year' : ?0 }")
    @Update("{ '$inc' : { 'insuranceStatista.numOfActiveRegistration' : 1, 'monthStatistas.$[month-1].insuranceStatista.numOfActiveRegistration' : 1} }")
    void incrementNumOfActiveRegistration(Integer year, Integer month);

    @Query("{ 'year' : ?0 }")
    @Update("{ '$inc' : { 'insuranceStatista.numOfActiveRegistration' : -1, 'monthStatistas.$[month-1].insuranceStatista.numOfActiveRegistration' : -1} }")
    void decreaseNumOfActiveRegistration(Integer year, Integer month);
    // Increment 'totalAvenueFromInsuranceFee' in AvenueStatista by a specified value
    @Query("{ 'year' : ?0 }")
    @Update("{ '$inc' : { 'claimStatista.numOfClaim' : 1, 'monthStatistas.$[month-1].claimStatista.numOfClaim' : 1 } }")
    void incrementNumOfClaim(Integer year, Integer month);

    @Query("{ 'year' : ?0 }")
    @Update("{ '$inc' : { 'claimStatista.numOfResolvedClaim' : 1, 'monthStatistas.$[month-1].claimStatista.numOfResolvedClaim' : 1} }")
    void incrementNumOfResolvedClaim(Integer year, Integer month);

    @Query("{ 'year' : ?0 }")
    @Update("{ '$inc' : { 'claimStatista.numOfPendingClaim' : 1, 'monthStatistas.$[month-1].claimStatista.numOfPendingClaim' : 1 } }")
    void incrementNumOfPendingClaim(Integer year, Integer month);


    @Query("{ 'year' : ?0 }")
    @Update("{ '$inc' : { 'claimStatista.numOfPendingClaim' : -1, 'monthStatistas.$[month-1].claimStatista.numOfPendingClaim' : -1} }")
    void decreaseNumOfPendingClaim(Integer year, Integer month);
    @Query("{ 'year' : ?0 }")
    @Update("{ '$inc' : { 'claimStatista.totalClaimAmount' : ?1, 'monthStatistas.$[month-1].claimStatista.totalClaimAmount' : ?1 } }")
    void incrementTotalClaimAmount(Integer year, Integer month, double increment);

    @Query("{ 'year' : ?0 }")
    @Update("{ '$inc' : { 'avenueStatista.totalAvenueFromInsuranceFee' : ?1, 'monthStatistas.$[month-1].avenueStatista.totalAvenueFromInsuranceFee' : ?1 } }")
    void incrementTotalAvenueFromInsuranceFee(Integer year, Integer month, double increment);
    // Increment 'totalProfit' in AvenueStatista by a specified value
    @Query("{ 'year' : ?0 }")
    @Update("{ '$inc' : { 'avenueStatista.totalProfit' : ?1, 'monthStatistas.$[month-1].avenueStatista.totalProfit': ?1 } }")
    void incrementTotalProfit(Integer year, Integer month, double increment);

    // Increment 'lossRatio' in RateStatista by a specified value
    @Query("{ 'year' : ?0 }")
    @Update("{ '$inc' : { 'rateStatista.lossRatio' : ?1 } }")
    void incrementLossRatio(Integer year, Integer month, double increment);

    // Increment 'compensationPayoutRatio' in RateStatista by a specified value
    @Query("{ 'year' : ?0 }")
    @Update("{ '$inc' : { 'rateStatista.compensationPayoutRatio' : ?1 } }")
    void incrementCompensationPayoutRatio(Integer year, Integer month, double increment);
}
