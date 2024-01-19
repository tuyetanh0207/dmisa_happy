package com.example.happylife.backendhappylife.service.handlerEvent.classEvent;

import com.example.happylife.backendhappylife.entity.Contract;

public class ContractEvent {
    private final Contract contract;

    public ContractEvent(Contract contract) {
        this.contract = contract;
    }

    public Contract getContract() {
        return contract;
    }
}
