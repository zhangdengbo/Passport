package com.yidianpuzi.service.impl;

import com.yidianpuzi.domain.Priority;
import com.yidianpuzi.domain.RolePriority;
import com.yidianpuzi.mapper.PriorityMapper;
import com.yidianpuzi.service.PriorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PriorityServiceImpl implements PriorityService {



    @Resource
    private PriorityMapper priorityMapper;


    @Override
    public List<Priority> findAllPriority() {
        return priorityMapper.findAllPriority();
    }

    @Override
    public int findAllPriorityCount() {
        return priorityMapper.findAllPriorityCount();
    }

    @Override
    public int updateByPrimaryKey(Priority record) {
        return priorityMapper.updateByPrimaryKey(record);
    }

    @Override
    public int deleteByPrimaryKey(long id) {
        return priorityMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(Priority record) {
        return priorityMapper.insert(record);
    }




}
