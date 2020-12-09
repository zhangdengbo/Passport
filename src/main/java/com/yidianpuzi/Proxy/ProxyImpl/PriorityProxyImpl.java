package com.yidianpuzi.Proxy.ProxyImpl;

import com.yidianpuzi.Proxy.PriorityProxy;
import com.yidianpuzi.domain.Priority;
import com.yidianpuzi.service.PriorityService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Component
public class PriorityProxyImpl implements PriorityProxy {

    @Resource
    private PriorityService priorityService;


    @Override
    public List<Priority> findAllPriority() {
        return priorityService.findAllPriority();
    }

    @Override
    public int findAllPriorityCount() {
        return priorityService.findAllPriorityCount();
    }


    @Override
    public int updateByPrimaryKey(Priority record) {
        record.setUpdateTime(new Date());
        record.setUpdateUser(1L);//更新者
        if (record.getParent() == null) {
            record.setParent(0L);
        }
        return priorityService.updateByPrimaryKey(record);
    }

    @Override
    public int deleteByPrimaryKey(long id) {
        return priorityService.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(Priority record) {

        record.setCreateTime(new Date());
        record.setCreateUser(1L);
        record.setUpdateTime(new Date());
        record.setUpdateUser(1L);
        if (record.getParent() == null) {
            record.setParent(0L);
        }
        return priorityService.insert(record);
    }
}
