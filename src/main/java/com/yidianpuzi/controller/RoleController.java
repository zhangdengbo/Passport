package com.yidianpuzi.controller;


import com.yidianpuzi.Proxy.RoleProxy;
import com.yidianpuzi.Proxy.UserProxy;
import com.yidianpuzi.constants.PassportStatus;
import com.yidianpuzi.domain.Role;
import com.yidianpuzi.domain.RolePriority;
import com.yidianpuzi.domain.User;
import com.yidianpuzi.util.PassportResponse;
import com.yidianpuzi.vo.PageData;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@Controller
@Slf4j
@Api(tags = "角色接口")
public class RoleController {

    @Resource
    private RoleProxy roleProxy;

    @RequestMapping(value = "findRoles", method = {RequestMethod.POST})
    @ResponseBody
    @ApiOperation("获取所有角色")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageNum", value = "页数", dataType = "String"),
            @ApiImplicitParam(name = "pageSize", value = "页行数", dataType = "String")}
    )
    public PassportResponse findUsers(Integer pageNum, Integer pageSize) {
        PassportResponse response = new PassportResponse();
        pageNum = pageNum == null ? 0 : pageNum - 1;
        pageSize = pageSize == null ? 20 : pageSize;

        Integer count = roleProxy.findRolesCount();
        List<Role> roles = roleProxy.findRoles(pageNum, pageSize);
        PageData<Role> pageData = new PageData<>();
        pageData.setTotal(count);
        pageData.setRows(roles);
        response.setStatus(PassportStatus.SUCCESS.getCode());
        response.setResult(pageData);
        return response;
    }

    @RequestMapping({"opeationRoles"})
    @ResponseBody
    @ApiOperation("新增或编辑一个角色")
    public PassportResponse saveRole(Role role) {
        PassportResponse response = new PassportResponse();
        Integer count = 0;
        if (role.getId() != null) {
            count = roleProxy.updateRole(role);
        } else {
            count = roleProxy.saveRole(role);
        }
        response.setStatus(count > 0 ? PassportStatus.SUCCESS.getCode() : PassportStatus.ERROR.getCode());
        return response;
    }


    @RequestMapping({"deleteRole"})
    @ResponseBody
    @ApiOperation("删除一个角色")
    public PassportResponse deleteRole(Integer id) {
        PassportResponse response = new PassportResponse();
        Integer count = roleProxy.delteRole(id);
        response.setStatus(count > 0 ? PassportStatus.SUCCESS.getCode() : PassportStatus.ERROR.getCode());
        return response;
    }

    @RequestMapping({"roleSourceAll"})
    @ResponseBody
    @ApiOperation("获取角色所有权限")
    public PassportResponse roleSourceAll(Integer roleId) {
        PassportResponse response = new PassportResponse();
        List<RolePriority> list = roleProxy.getAllByRoleId(roleId);
        PageData<RolePriority> pageData = new PageData<>();
        pageData.setRows(list);
        pageData.setTotal(list.size());
        response.setResult(pageData);

        response.setStatus(PassportStatus.SUCCESS.getCode());
        return response;
    }

    @RequestMapping(value = "roleSourceEdit", method = {RequestMethod.POST})
    @ResponseBody
    @ApiOperation("编辑角色权限")
    public PassportResponse roleSourceEdit(@RequestParam(value = "roleId")Long roleId,
                                           @RequestParam(value = "sourceId[]") Long[] sourceId) {


        PassportResponse response = new PassportResponse();
        int count = roleProxy.changeRolePriority(roleId, sourceId);
        response.setStatus(count > 0 ? PassportStatus.SUCCESS.getCode() : PassportStatus.ERROR.getCode());
        return response;
    }


}
