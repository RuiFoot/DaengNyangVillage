package com.myspring.daengnyang.animal.service;

import com.myspring.daengnyang.animal.vo.AnimalDetailVO;
import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.animal.vo.AnimalReviewVO;

import java.util.List;

public interface AnimalService {
    List<String> getClassification();
    List<AnimalLocationVO> getLocation(String classification);

    AnimalDetailVO getDetail(Integer animalNum);

    AnimalReviewVO getReview(Integer animalNum);
}