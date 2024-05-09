package com.myspring.daengnyang.animal.service;

import com.myspring.daengnyang.animal.vo.AnimalDetailVO;
import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.animal.vo.AnimalReviewVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AnimalService {
    List<String> getClassification();

    List<String> getSigungu(String sido);

    Page<AnimalLocationVO> getLocation(String sido, String sigungu, String classification, Pageable pageable);


    AnimalDetailVO getDetail(Integer animalNum);

    AnimalReviewVO getReview(Integer animalNum);

    boolean animalReviewPost(AnimalReviewVO animalReviewVO);

    boolean updateAnimalReview(AnimalReviewVO animalReview);

    boolean deleteAnimalReview(Integer animalReviewNum);

    List<AnimalLocationVO> getRecommend(Integer memberNo, String sido, String sigungu);

    boolean favoriteCheck(Integer memberNo, Integer animalNum);

    boolean getFavorite(Integer animalNum, Integer memberNo);
}
