package com.example.happylife.backendhappylife.DTO.ClaimDTO;

import com.example.happylife.backendhappylife.entity.Object.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClaimUpdateStatusRes {
    ClaimResDTO claim;
    Message message;
}
