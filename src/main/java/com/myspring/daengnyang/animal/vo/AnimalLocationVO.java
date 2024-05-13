package com.myspring.daengnyang.animal.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnimalLocationVO {
    private Integer animalNum;
    private String largeClassification;
    private String facilityName;
    private String subClassification;
    private String sido;
    private String sigungu;
    private String eupmyeondong;
    private String ri;
    private String houseNumber;
    private String streetName;
    private String buildingNumber;
    private String latitude;
    private String longitude;
    private double star;
    private String imgPath;
    private String roadAddress;
    private String numberAddress;
}
