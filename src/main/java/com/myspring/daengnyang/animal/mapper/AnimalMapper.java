package com.myspring.daengnyang.animal.mapper;


import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AnimalMapper {
    List<String> getAllClassification();
}
