package com.yidianpuzi.Proxy.ProxyImpl;

import com.yidianpuzi.Proxy.RoleProxy;
import com.yidianpuzi.domain.Role;
import com.yidianpuzi.domain.RolePriority;
import com.yidianpuzi.service.RoleService;
import com.yidianpuzi.service.UserService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/*业务逻辑写这里*/
@Component
public class RoleProxyImpl implements RoleProxy {

    @Resource
    private RoleService roleService;


    @Override
    public List<Role> findRoles(Integer pageNum, Integer pageSize) {

        return roleService.findRoles(pageNum, pageSize);
    }

    @Override
    public int findRolesCount() {
        return roleService.findRolesCount();
    }

    @Override
    public int saveRole(Role role) {
        role.setCreateUser(1L);
        role.setUpdateUser(1L);
        role.setCreateTime(new Date());
        role.setUpdateTime(new Date());
        return roleService.insert(role);
    }

    @Override
    public int updateRole(Role role) {
        role.setUpdateTime(new Date());
        return roleService.update(role);
    }

    @Override
    public int delteRole(long id) {
        return roleService.delete(id);
    }

    @Override
    public List<RolePriority> getAllByRoleId(long roleId) {
        return roleService.getAllByRoleId(roleId);
    }

    @Override
    public  int changeRolePriority(Long roleId,Long [] sourceId) {
        return roleService.changeRolePriority(roleId, sourceId);
    }
}
