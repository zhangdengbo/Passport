package com.yidianpuzi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.VersionResourceResolver;

@Configuration
public class MvcInterceptorConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(false)
                .addResolver(new VersionResourceResolver()
                                .addFixedVersionStrategy("v1.0.1", "/**") //添加版本号,手动修改版本号
                        // .addContentVersionStrategy("/**")  //md5码方式
                );
    }

}
