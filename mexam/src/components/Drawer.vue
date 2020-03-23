<template>
  <div class="drawer">
      <div class="drawer-title">
         drawer
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .drawer{
        width:100%;
        height:100%;
        z-index:99;
        display:flex;
        flex-direction:column;
        // justify-content:center;
        align-items:center;

        &>div{
            margin:5px 0 10px;
        }

        .drawer-avatar{
            width:100px;
            height:100px;
            img{
                width:100%;
                height:100%;
            }
        }
        .drawer-title,
        .drawer-erCode,
        .drawer-admin{
            h4{
                text-align:center;
                margin: 0 0 20px;
            }
        }
        .drawer-title{
            p{
                font-size: 14px;
                text-indent: 2em;
                padding: 0 16px;
                line-height:25px;
                box-sizing:border-box;
            }
        }
        .drawer-admin{
            ul,li{
                list-style:none;
            }
            li{
                margin:10px 0;
            }
        }
        .drawer-erCode{
            display:flex;
            flex-direction:column;
            align-items:center;

            .ercode{
                width:120px;
                height:120px;
                img{
                    width:100%;
                    height:100%;
                }
            }
        }
    }
</style>