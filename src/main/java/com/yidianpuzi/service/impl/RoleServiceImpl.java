package com.yidianpuzi.service.impl;

import com.yidianpuzi.domain.Role;
import com.yidianpuzi.domain.RolePriority;
import com.yidianpuzi.domain.User;
import com.yidianpuzi.mapper.RoleMapper;
import com.yidianpuzi.mapper.RolePriorityMapper;
import com.yidianpuzi.mapper.UserMapper;
import com.yidianpuzi.service.RoleService;
import com.yidianpuzi.service.UserService;
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
public class RoleServiceImpl implements RoleService {

    @Autowired
    DataSourceTransactionManager dataSourceTransactionManager;
    @Autowired
    TransactionDefinition transactionDefinition;

    @Resource
    private RoleMapper roleMapper;
    @Resource
    private RolePriorityMapper rolePriorityMapper;

    @Override
    public List<Role> findRoles(Integer pageNum, Integer pageSize) {
        Integer limit = pageNum * pageSize;
        return roleMapper.findRoles(limit, pageSize);
    }

    @Override
    public int findRolesCount() {
        return roleMapper.findRolesCount();
    }

    @Override
    public int insert(Role role) {
        return roleMapper.insert(role);
    }

    @Override
    public int update(Role role) {
        return roleMapper.updateByPrimaryKeySelective(role);
    }

    @Override
    public int delete(long id) {
        return roleMapper.deleteByPrimaryKey(id);
    }

    @Override
    public List<RolePriority> getAllByRoleId(long roleId) {
        return rolePriorityMapper.getAllByRoleId(roleId);
    }


    @Override
    public int changeRolePriority(Long roleId, Long[] sourceId) {
        TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(transactionDefinition);
        try {
            List<RolePriority> list = new ArrayList<>();
            for (long s : sourceId) {
                Date nowDt = new Date();
                RolePriority item = new RolePriority();
                item.setCreateTime(nowDt);
                item.setCreateUser(1L); //创建者id
                item.setUpdateTime(nowDt);
                item.setUpdateUser(1L); //更新者id
                item.setPriorityId(s);//权限id
                item.setRoleId(roleId);//角色id
                list.add(item);
            }

            rolePriorityMapper.deleteByRoleId((long) roleId); //删除
            rolePriorityMapper.insertList(list);
            dataSourceTransactionManager.commit(transactionStatus);
            return 1;
        } catch (Exception ex) {
            //事务回滚
            dataSourceTransactionManager.rollback(transactionStatus);
            return 0;
        }


    }
}
