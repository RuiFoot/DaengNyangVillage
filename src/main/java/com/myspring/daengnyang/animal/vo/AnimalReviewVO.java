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
    private String review;
    private Integer star;
    private Date createDate;
}
