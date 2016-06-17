<template>

        <nav class="navbar navbar-default" role="navigation">
            <div class="container">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="">班车预约系统</a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav">
                        <li><a>Index</a></li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <b class="glyphicon glyphicon-user"></b></a>
                            <ul class="dropdown-menu">
                                <li><a v-link="{ path:'/index/change_password' }">修改密码</a></li>
                                <li><a v-link="{ path:'/index/bind_manage_to_wechat' }">绑定学号</a></li>                                
                                <li role="separator" class="divider"></li>
                                <li><a @click="logout()">退出登录</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
        </nav>

    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
    
    let juicycookie = require('juicy-cookie')
    
    export default{
        
        name:'UserView',
        data(){
            
            
            return {
                'menus':null,
                'user':{
                    "Name":""
                },
                'is_mobile':false
            }
        },
        ready(){
            let ROLE_STUDENT_OUT_SCHOOL             =   0;
            let ROLE_STUDENT_IN_SCHOOL              =   1;
            let ROLE_DRIVER                         =   2;
            let ROLE_MANAGE                         =   3;
            let ROLE_ADMIN                          =   4;
            let ROLE_ROOT                           =   5;
            let url = this.$apis.domain + '/api/user';
          this.$http.get(url).then(function(response){
                this.user = response.data.Data;
                this.menus = JSON.parse(this.user.MenuLinks);
            }, function(response){
                console.log(response.data.Data);
            }); 
        },
        components:{
            Menu
        },
        methods:{
            logout(){
                juicycookie.rm('User');
                this.$route.router.go('/login');
            }
        }
    }
</script>

<style lang="less">

</style>