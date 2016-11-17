/**
 * 命名注释：server简称_header. 父模块 dipan. 功能_默认头像或其他默认数据. 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('header', header);


    function header() {
        var re = {};
        re.defaultHeader = defaultHeader();//根据省查询城市
        /**
         * 返回头像base64
         */
        function defaultHeader() {
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+tJREFUeNrsWctx2zAQpT0pgKnAdAWmOxArCF2BrQoknnyUdPRJUgVmKrBSgegKQldgdhClgyw0D8kOApD4MT6EO4ORLYELvP3vMkkmmmiiif5HunB94PHxMaePGf5tnp6e2pgXIv6Cd0d8u9FB0WEpfbwwQJIaWlUIOPBe0VqyrzvwPYwCCoceaeWGLSdahQ8wC9474lu58Ly03Nd3qKDzxWCarrQd4L0kvg9RQRHDtXKo0MoOq1OAPXv4z4PGnFV/2tLeLAoomMaCfVXTuhbmgHWN7yTljlJdKbw/E88CfAsIUApsFcWnoKUVi3SFYd8zk3iHS9lo6SgB0TNzQ6Q9AlQCgXah5nfPTO6uZ1/FTCajy5QWAr1nQpjrNiDw8CCxCDI/SEna8Z4OOJn24reN5sJ9JIFv+jYR75oJrAz1qVKx9yTW4RBYyp4bog2zgjwE1A3zJdvsvld8xkQzFuls6KB51guUlMirQzSzPfzGhTfMu1Ge9QKVOUozgUZlVXFlwdulvntVnnUDpdita+nTWBw+8wDVKhbkrKlUUb0L/XTYe/LYm8aq/WJriuchW7LW6qcRe7UMZVbu6UN/+Svx+3BQgn58ROc7hvllY1zUpa25HHJgmNAooBx5p0GgFAd2bfxumGBqFMIFPndKxMs9hHUK8akOjGYuCRgXFZXFXJMODqSdDZtHZB7CakNAtTj0C621g92Lin43UPJUtPfNpuTRJOw2JFC8sm7WSqLCbPsAaar6vaWwMmaqbyGgGtfmzCf3WG5dGO7l1c6/M7u/DhkwBoRyEfXeEf2EJdyGJt89RliCXuiAwqMWNF10iQ75bqBcembh/GuM5FuzEHoegvDcIv52zWMIJt8RAZu+0gkDnVJJEWHTJDBeMm2pzWBuMznSTIdOCPkN+62E4BpoZqE0mhvav46hqQTRrNHML0ql07UxuSM0c8sBsQCwwB51Zt/aAnKp/e4M+WFvAwbzCjm91SVlmb8OhpJtHr2gxYEFyhwuvT5/EPntBZX6kflGaTO4YVWN84sHn/dTchprfBuB0fMWUt4gLazg6A/QujaSsjRi3DNG6yEz+zcDIGlqB/hOzTQ7hyllyZ+Rsynpp77pwxuUxtF5XjkDUC51YuVRhfJr3Tc18mh73EGxAWVr+L2EFiqNs8/kJQFMaHKlqStD2h4vTQ3NGkxalP/z15+VLnAoQSH9l6De+jpmEfX42BkXraGZJStmO8PFmxBNuQ5ergY0VSPKnZMzm/5UWAKAeCu4gPllhk62DZk+XSSRCaXQVqkIfr+wQ7j/AoDi0lWMInlUUEpjN4M2mp5oOdFEE000URT6JcAACGmw9q7dCUwAAAAASUVORK5CYII=';
        }

        return re;
    }


})();

