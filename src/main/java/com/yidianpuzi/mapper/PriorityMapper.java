package com.yidianpuzi.mapper;

import com.yidianpuzi.domain.Priority;

import java.util.List;

public interface PriorityMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_priority
     * @mbg.generated
     */
    int insert(Priority record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_priority
     * @mbg.generated
     */
    int insertSelective(Priority record);

    List<Priority> findAllPriority();

    int findAllPriorityCount();

    int updateByPrimaryKey(Priority record);

    int deleteByPrimaryKey(long id);



}