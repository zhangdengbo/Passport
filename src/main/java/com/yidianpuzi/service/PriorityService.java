package com.yidianpuzi.service;

import com.yidianpuzi.domain.Priority;
import com.yidianpuzi.domain.RolePriority;

import java.util.List;

public interface PriorityService {

    List<Priority> findAllPriority();

    int findAllPriorityCount();

    int updateByPrimaryKey(Priority record);

    int deleteByPrimaryKey(long id);

    int insert(Priority record);


}
