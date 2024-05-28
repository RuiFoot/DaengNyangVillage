package com.myspring.daengnyang.animal.vo;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class AnimalReviewVO {
    private Integer animalReviewNum;
    private Integer animalNum;
    private String nickname;
    private Integer memberNo;
    private String profileImg;
    private String review;
    private double star;
    private Date createDate;
}
