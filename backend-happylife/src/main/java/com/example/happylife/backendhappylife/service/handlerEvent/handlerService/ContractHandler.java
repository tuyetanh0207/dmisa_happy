package com.example.happylife.backendhappylife.service.handlerEvent.handlerService;

import com.example.happylife.backendhappylife.service.ContractService;
import com.example.happylife.backendhappylife.service.handlerEvent.classEvent.ContractEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ContractHandler {
    @Autowired
    private ContractService contractService;

    @EventListener
    public void onContractCreated(ContractEvent event) {
        contractService.addContract(event.getContract().convertToContractResDTO());
    }
}
