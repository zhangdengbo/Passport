package com.yidianpuzi.Proxy.ProxyImpl;

import com.yidianpuzi.Proxy.UserProxy;
import com.yidianpuzi.domain.User;
import com.yidianpuzi.service.UserService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class UserProxyImpl implements UserProxy {

    @Resource
    private UserService userService;

    @Override
    public void saveUser(User user) {
        userService.saveUser(user);
    }

    @Override
    public void updateUser(User user) {
        userService.updateUser(user);
    }

    @Override
    public User getUserById(Long id) {
        return userService.getUserById(id);
    }

    @Override
    public void deleteUserById(Long id) {
        userService.deleteUserById(id);
    }

    @Override
    public User getUserByPassportAndPassword(String passport, String passwd) {
        return userService.getUserByPassportAndPassword(passport,passwd);
    }

    @Override
    public List<User> findUsers(String userName, String phone, String passport, Integer pageNum, Integer pageSize) {
        return userService.findUsers(userName,phone,passport,pageNum,pageSize);
    }

    @Override
    public int findUsersCount(String userName, String phone, String passport) {
        return userService.findUsersCount(userName,phone,passport);
    }
}
