package com.myspring.daengnyang.animal.mapper;


import com.myspring.daengnyang.animal.vo.AnimalDetailVO;
import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.animal.vo.AnimalReviewVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AnimalMapper {
    List<String> getClassification();
    List<AnimalLocationVO> getLocation(@Param("classification") String classification);

    AnimalDetailVO getDetail(@Param("animalNum") Integer animalNum);

    AnimalReviewVO getReview(@Param("animalNum") Integer animalNum);
}
