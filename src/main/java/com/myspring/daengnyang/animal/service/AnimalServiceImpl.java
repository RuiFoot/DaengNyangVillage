package com.myspring.daengnyang.animal.service;

import com.myspring.daengnyang.animal.mapper.AnimalMapper;
import com.myspring.daengnyang.animal.vo.AnimalDetailVO;
import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.animal.vo.AnimalReviewVO;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.MyBatisSystemException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public List<AnimalLocationVO> getLocation(String location, String classification) {
        log.info("시설 위치 정보 조회 서비스 실행 => classification : " + location + ", classification : " + classification);
        return animalMapper.getLocation(location, classification);
    }

    @Override
    public AnimalDetailVO getDetail(Integer animalNum) {
        log.info("시설 상세 정보 조회 서비스 실행 => animalNum : " + animalNum);
        return animalMapper.getDetail(animalNum);
    }

    @Override
    public AnimalReviewVO getReview(Integer animalNum) {
        log.info("시설 댓글 정보 조회 서비스 실행 => animalNum : " + animalNum);
        return animalMapper.getReview(animalNum);
    }

    @Override
    public boolean animalReviewPost(AnimalReviewVO animalReviewVO) {
        try {
            Integer checked = animalMapper.animalReviewPost(animalReviewVO);
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
            int rowsAffected = animalMapper.deleteAnimalReview(animalReviewNum);
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
    public List<AnimalLocationVO> getRecommend(Integer memberNo, String sido, String sigungu) {
        return null;
    }

    @Override
    public boolean favoriteCheck(Integer memberNo, Integer animalNum) {
        Integer checked = animalMapper.favoriteCheck(memberNo, animalNum);
        return checked > 0;
    }

}
