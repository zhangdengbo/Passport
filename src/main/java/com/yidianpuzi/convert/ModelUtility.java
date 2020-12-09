package com.yidianpuzi.convert;

import com.yidianpuzi.domain.Priority;
import com.yidianpuzi.domain.SonPriority;

import java.util.ArrayList;
import java.util.List;

public class ModelUtility {

    public static List<SonPriority> ConvertoSonPriority(List<Priority> item){

        List<SonPriority> listResult = new ArrayList<SonPriority>();
        item.forEach(u->{
            SonPriority itemResult = new SonPriority();
            itemResult.setId(u.getId());
            itemResult.setParent(u.getParent());
            itemResult.setPriorityName(u.getPriorityName());
            itemResult.setPriortyUrl(u.getPriortyUrl());
            itemResult.setType(u.getType());
            itemResult.setRemarks(u.getRemarks());
            itemResult.setCreateTime(u.getCreateTime());
            itemResult.setUpdateTime(u.getUpdateTime());
            itemResult.setUpdateUser(u.getUpdateUser());
            itemResult.setCreateUser(u.getCreateUser());
            itemResult.setText(u.getPriorityName());
            listResult.add(itemResult);
        });
        return  listResult;
    }
}
