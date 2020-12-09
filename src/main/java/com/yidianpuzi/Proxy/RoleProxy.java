package com.yidianpuzi.Proxy;

import com.yidianpuzi.domain.Priority;
import com.yidianpuzi.domain.Role;
import com.yidianpuzi.domain.RolePriority;

import java.util.List;

public interface RoleProxy {
    List<Role> findRoles(Integer pageNum, Integer pageSize);
    int findRolesCount();

    int saveRole(Role role);

    int updateRole(Role role);

    int delteRole(long id);
    List<RolePriority> getAllByRoleId(long roleId);

    int changeRolePriority(Long roleId,Long [] sourceId);

}
