package com.myspring.daengnyang.animal.service;

import com.myspring.daengnyang.animal.vo.AnimalDetailVO;
import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.animal.vo.AnimalReviewVO;

import java.util.List;

public interface AnimalService {
    List<String> getClassification();

    List<String> getSigungu(String sido);

    List<AnimalLocationVO> getLocation(String location, String classification);


    AnimalDetailVO getDetail(Integer animalNum);

    AnimalReviewVO getReview(Integer animalNum);

    boolean animalReviewPost(AnimalReviewVO animalReviewVO);

    boolean updateAnimalReview(AnimalReviewVO animalReview);

    boolean deleteAnimalReview(Integer animalReviewNum);

    List<AnimalLocationVO> getRecommend(Integer memberNo, String sido, String sigungu);

    boolean favoriteCheck(Integer memberNo, Integer animalNum);
}
