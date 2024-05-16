package com.myspring.daengnyang.animal.service;

import com.myspring.daengnyang.animal.mapper.AnimalMapper;
import com.myspring.daengnyang.animal.vo.AnimalDetailVO;
import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.animal.vo.AnimalReviewVO;
import com.myspring.daengnyang.common.vo.Paging;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.MyBatisSystemException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class AnimalServiceImpl implements AnimalService {

    private final AnimalMapper animalMapper;

    public AnimalServiceImpl(AnimalMapper animalMapper) {
        this.animalMapper = animalMapper;
    }

    @Override
    public List<String> getClassification() {
        log.info("시설 분류 정보 조회 서비스 실행");
        return animalMapper.getClassification();
    }

    @Override
    public List<String> getSigungu(String sido) {
        return animalMapper.getSigungu(sido);
    }

    @Override
    public Page<AnimalLocationVO> getLocation(String sido, String sigungu, String classification, Pageable pageable) {
        log.info("시설 위치 정보 조회 서비스 실행 => classification : " + sido + ", classification : " + classification);

        Map<String,String> formData = new HashMap<>();
        formData.put("sido",sido);
        formData.put("sigungu",sigungu);
        formData.put("classification",classification);


        Paging<?> requestList = Paging.builder().data(formData).pageable(pageable).build();

        log.info(requestList.toString());

        List<AnimalLocationVO> locationData = animalMapper.getLocation(requestList);

        log.info(locationData.toString());

        int total = animalMapper.getLocationCount(formData);
        log.info("total : " + total);

        return new PageImpl<>(locationData,pageable,total);
    }


    @Override
    public AnimalDetailVO getDetail(Integer animalNum) {
        log.info("시설 상세 정보 조회 서비스 실행 => animalNum : " + animalNum);
        return animalMapper.getDetail(animalNum);
    }

    @Override
    public List<AnimalReviewVO> getReview(Integer animalNum) {
        log.info("시설 댓글 정보 조회 서비스 실행 => animalNum : " + animalNum);
        return animalMapper.getReview(animalNum);
    }

    @Override
    public boolean animalReviewPost(AnimalReviewVO animalReviewVO) {
        try {
            if (animalReviewVO.getProfileImg() == null){
                animalReviewVO.setProfileImg("");
            }
            Integer checked = animalMapper.animalReviewPost(animalReviewVO);
            animalMapper.updateAnimalStar1(animalReviewVO.getAnimalNum());
            animalMapper.updateAnimalStar2(animalReviewVO.getAnimalNum());
            return checked > 0;
        } catch (DataIntegrityViolationException e) {
            // 데이터 무결성 위반 등의 예외 처리
            // 여기에 예외를 처리하는 로직을 작성하면 됩니다.
            log.error(e.getMessage());
            return false; // 실패한 경우를 반환하거나 적절한 처리를 해주세요.
        } catch (MyBatisSystemException e) {
            // MyBatis 예외 처리
            // 여기에 예외를 처리하는 로직을 작성하면 됩니다.
            log.error(e.getMessage());
            return false; // 실패한 경우를 반환하거나 적절한 처리를 해주세요.
        }
    }

    @Override
    public boolean updateAnimalReview(AnimalReviewVO animalReview) {
        try {
            int rowsAffected = animalMapper.updateAnimalReview(animalReview);
            animalMapper.updateAnimalStar1(animalReview.getAnimalNum());
            animalMapper.updateAnimalStar2(animalReview.getAnimalNum());
            return rowsAffected > 0;
        } catch (DataIntegrityViolationException e) {
            // 데이터 무결성 위반 등의 예외 처리
            // 여기에 예외를 처리하는 로직을 작성하면 됩니다.
            log.error(e.getMessage());
            return false; // 실패한 경우를 반환하거나 적절한 처리를 해주세요.
        } catch (MyBatisSystemException e) {
            // MyBatis 예외 처리
            // 여기에 예외를 처리하는 로직을 작성하면 됩니다.
            log.error(e.getMessage());
            return false; // 실패한 경우를 반환하거나 적절한 처리를 해주세요.
        }
    }

    @Override
    public boolean deleteAnimalReview(Integer animalReviewNum) {
        try {
            int animalNum = animalMapper.getAnimalNum(animalReviewNum);
            int rowsAffected = animalMapper.deleteAnimalReview(animalReviewNum);
            animalMapper.updateAnimalStar1(animalNum);
            animalMapper.updateAnimalStar2(animalNum);
            return rowsAffected > 0;
        } catch (DataIntegrityViolationException e) {
            // 데이터 무결성 위반 등의 예외 처리
            // 여기에 예외를 처리하는 로직을 작성하면 됩니다.
            log.error(e.getMessage());
            return false; // 실패한 경우를 반환하거나 적절한 처리를 해주세요.
        } catch (MyBatisSystemException e) {
            // MyBatis 예외 처리
            // 여기에 예외를 처리하는 로직을 작성하면 됩니다.
            log.error(e.getMessage());
            return false; // 실패한 경우를 반환하거나 적절한 처리를 해주세요.
        }
    }

    @Override
    public List<AnimalLocationVO> getRecommend(String sido, String sigungu) {
        return animalMapper.getRecommend(sido,sigungu);
    }

    @Override
    public boolean favoriteCheck(Integer memberNo, Integer animalNum) {
        Integer checked = animalMapper.favoriteCheck(memberNo, animalNum);
        return checked > 0;
    }

    @Override
    public boolean getFavorite(Integer animalNum, Integer memberNo) {
        return animalMapper.getFavorite(animalNum, memberNo) > 0;
    }

    @Override
    public List<AnimalLocationVO> getPopular() {
        log.info("인기 장소 서비스 실행");
        List<AnimalLocationVO> result = animalMapper.getPopular();
        log.info(result.toString());
        return result;
    }

}
