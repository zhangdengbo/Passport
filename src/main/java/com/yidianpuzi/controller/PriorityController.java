package com.yidianpuzi.controller;


import com.yidianpuzi.Proxy.PriorityProxy;
import com.yidianpuzi.constants.PassportStatus;
import com.yidianpuzi.convert.ModelUtility;
import com.yidianpuzi.domain.Priority;
import com.yidianpuzi.domain.Role;
import com.yidianpuzi.domain.SonPriority;
import com.yidianpuzi.util.PassportResponse;
import com.yidianpuzi.vo.PageData;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.AbstractList;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@Slf4j
@Api(tags = "权限接口")
public class PriorityController {

    @Resource
    private PriorityProxy priorityProxy;


    @RequestMapping(value = "findAllPriotiry", method = {RequestMethod.POST})
    @ResponseBody
    @ApiOperation("获取所有权限")
    public PassportResponse findAllPriotiryProxy() {
        PassportResponse response = new PassportResponse();
        int count = priorityProxy.findAllPriorityCount();
        List<Priority> list = priorityProxy.findAllPriority();
        List<SonPriority> resultData = recursiveData(list);
        //  PageData<Priority> pageData = new PageData<>();
        PageData<SonPriority> pageData = new PageData<>();
        pageData.setTotal(count);
        pageData.setRows(resultData);
        response.setStatus(PassportStatus.SUCCESS.getCode());
        response.setResult(pageData);
        return response;
    }

    /*获取菜单以及菜单对应的方法*/
    public List<SonPriority> recursiveData(List<Priority> list) {
        List<SonPriority> listResultData = new ArrayList<>();

        //Priority 转 SonPriority
        List<SonPriority> listSp = ModelUtility.ConvertoSonPriority(list);

        //获取一级菜单集合
        List<Priority> rootMenu = list.stream().filter(first -> first.getParent() == 0).collect(Collectors.toList());
        rootMenu.forEach(u -> {
            SonPriority sp = new SonPriority();
            sp.setRemarks(u.getRemarks());
            sp.setId(u.getId());
            sp.setType(u.getType());
            sp.setParent(u.getParent());
            sp.setPriortyUrl(u.getPriortyUrl());
            sp.setPriorityName(u.getPriorityName());
            sp.setCreateUser(u.getCreateUser());
            sp.setCreateTime(u.getCreateTime());
            sp.setUpdateUser(u.getUpdateUser());
            sp.setUpdateTime(u.getUpdateTime());
            sp.setText(u.getPriorityName());
            //递归获取根节点下的所有子节点
            List<SonPriority> childList = getChild(u.getId(), listSp);
            sp.setChildren(childList);
            listResultData.add(sp);
        });
        return listResultData;
    }

    /*获取子节点*/
    public List<SonPriority> getChild(long id, List<SonPriority> allMenu) {

        //子菜单
        List<SonPriority> childList = new ArrayList<SonPriority>();
        //遍历所有节点，将所有菜单的父id与 传过来的根节点id比较
        //如果相等则为该节点的根节点
        for (SonPriority nav : allMenu) {
            long i = nav.getParent();
            if (nav.getParent().equals(id)) {
                childList.add(nav);
            }
        }
        //递归获取子节点
        for (SonPriority nav : childList) {
            nav.setChildren(getChild(nav.getId(), allMenu));
        }
        if (childList.size() == 0) {
            return new ArrayList<SonPriority>();
        }
        return childList;
    }


    @RequestMapping(value = "operationPriotiry", method = {RequestMethod.POST})
    @ResponseBody
    @ApiOperation("增加或修改权限")
    public PassportResponse operationPriotiry(Priority item) {
        PassportResponse response = new PassportResponse();
        Integer count = 0;
        if (item.getId() != null && item.getId() != 0) {
            count = priorityProxy.updateByPrimaryKey(item);
        } else {
            count = priorityProxy.insert(item);
        }
        response.setStatus(count > 0 ? PassportStatus.SUCCESS.getCode() : PassportStatus.ERROR.getCode());
        return response;

    }
}
