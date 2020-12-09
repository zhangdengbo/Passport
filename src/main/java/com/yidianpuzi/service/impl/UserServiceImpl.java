package com.yidianpuzi.service.impl;

import com.yidianpuzi.domain.User;
import com.yidianpuzi.mapper.UserMapper;
import com.yidianpuzi.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userMapper;

    @Override
    public List<User> findUsers(String userName, String phone, String passport, Integer pageNum, Integer pageSize) {
        Integer limit  = pageNum  * pageSize ;
        return userMapper.findUsers(userName,phone,passport,limit,pageSize);
    }

    @Override
    public int findUsersCount(String userName, String phone, String passport) {
        return userMapper.findUsersCount(userName,phone,passport);
    }

    @Override
    public void saveUser(User user) {
        userMapper.insert(user);
    }

    @Override
    public void updateUser(User user) {
        userMapper.updateByPrimaryKey(user);
    }

    @Override
    public User getUserById(Long id) {
        return userMapper.selectByPrimaryKey(id);
    }

    @Override
    public void deleteUserById(Long id) {
        userMapper.deleteByPrimaryKey(id);
    }
}
