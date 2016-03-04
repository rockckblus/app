$('#formLogin').form(
    {
        name: {
            identifier: 'name',
            rules: [
                {
                    type: 'empty',
                    prompt: '请输入用户名'
                }
            ]
        },
        password: {
            identifier: 'password',
            rules: [
                {
                    type: 'empty',
                    prompt: '密码不能为空'
                },
                {
                    type: 'length[6]',
                    prompt: '密码长度不能小于6位'
                }
            ]
        }


    },
    {
        inline: true,
        on: 'blur',
        onSuccess : function() {



            $('#successMess').html('subMit').show().transition('tada');

            $("#LoginForm").submit();
        }
    }

);