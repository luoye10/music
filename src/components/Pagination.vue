<template>
    <div class="pagination">
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="pageChange"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
export default {
    props: ['total', 'size'],
    data() {
        return {

        }
    },
    mounted() {
    },
    methods: {
        pageChange(page) {
            this.$emit('pageChange', page)
        }
    }
}
</script>
<style lang="less" scoped>
    .pagination{
        text-align: center;
        /deep/ .el-pagination{
            .el-pager{
                .number{
                    color: aqua;
                }
            }
        }
    }
</style>