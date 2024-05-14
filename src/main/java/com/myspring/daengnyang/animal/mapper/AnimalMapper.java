package com.myspring.daengnyang.animal.mapper;


import com.myspring.daengnyang.animal.vo.AnimalDetailVO;
import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.animal.vo.AnimalReviewVO;
import com.myspring.daengnyang.common.vo.Paging;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface AnimalMapper {
    List<String> getClassification();

    List<String> getSigungu(@Param("sido") String sido);

    List<AnimalLocationVO> getLocation(Paging<?> requestList);

    Integer getLocationCount(Map<String,String> formData);

    AnimalDetailVO getDetail(@Param("animalNum") Integer animalNum);

    List<AnimalReviewVO> getReview(@Param("animalNum") Integer animalNum);

    Integer animalReviewPost(@Param("animalPost") AnimalReviewVO animalReviewVO);

    Integer favoriteCheck(Integer memberNo, Integer animalNum);

    Integer updateAnimalReview(@Param("animalPost") AnimalReviewVO animalReviewVO);

    Integer deleteAnimalReview(@Param("animalReviewNum") Integer animalReviewNum);

    Integer updateAnimalStar1(@Param("animalNum") Integer animalNum);

    Integer updateAnimalStar2(@Param("animalNum") Integer animalNum);

    Integer getAnimalNum(@Param("animalReviewNum") Integer animalReviewNum);

    int getFavorite(@Param("animalNum") Integer animalNum, @Param("memberNo") Integer memberNo);

    List<AnimalLocationVO> getPopular();
    List<AnimalLocationVO> getRecommend(@Param("sido") String sido, @Param("sigungu") String sigungu);

}
