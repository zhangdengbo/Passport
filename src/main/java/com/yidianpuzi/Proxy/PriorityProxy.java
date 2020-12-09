package com.yidianpuzi.Proxy;

import com.yidianpuzi.domain.Priority;

import java.util.List;

public interface PriorityProxy {
    List<Priority> findAllPriority();

    int findAllPriorityCount();

    int updateByPrimaryKey(Priority record);

    int deleteByPrimaryKey(long id);

    int insert(Priority record);


}
