package com.yidianpuzi.service;

import com.yidianpuzi.domain.Role;
import com.yidianpuzi.domain.RolePriority;
import com.yidianpuzi.domain.User;

import java.util.List;

public interface RoleService {

    List<Role> findRoles(Integer pageNum, Integer pageSize);

    int findRolesCount();

    int insert(Role role);

    int update(Role role);

    int delete(long id);
    List<RolePriority> getAllByRoleId(long roleId);

    int changeRolePriority(Long roleId, Long[] sourceId);
}
