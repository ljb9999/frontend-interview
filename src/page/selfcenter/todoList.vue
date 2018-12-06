<style scoped lang='less'>
span {
    font-size: 0.4rem;
}
input {
    display: inline-block;
    width: 60%;
    height: 0.35rem;
	cursor: pointer;
	text-align: center;
	color: #000;
	border-radius: 0.1rem;
}
button {
    float: right;
}
.del {
    margin-top: 0.5rem;
}
</style>
<template>
	<li>
        <span>备忘:</span>
		<span v-if="!isShowText" v-on:click="showText">{{lists.title}}</span>
		<input type="text" v-if="isShowText" v-focus @blur="hideText()" @change="setTitle(lists.id)" v-model="lists.title">
		<mt-button class="del" @click="del(lists.id)" size="small">删除	</mt-button>
	</li>
</template>
<script>
	import { Button } from 'mint-ui';
	import { Toast } from 'mint-ui'
	import api from '@/fetch/api'
	export default{
		props:["list"],
		data(){
			return{
				// 控制 文本框显示和隐藏
				isShowText : false,
				lists: this.list
			}
		},
		methods:{
			// 删除
			del(id){
				api.del(id).then(res => {
					if(res.status == 201 || res.status == 200) {
						Toast('删除成功')
						this.$parent.getList()
					}else {
						Toast('删除失败')
					}
				})
			},
			showText(){
				// 隐藏或显示文本框
				this.isShowText = !this.isShowText
			},
			hideText(){
				let that = this
				that.showText() 
			},
			setTitle(id) {
				let that = this
				that.correct(id, that.lists.title);
			},
			correct(id, title){
				let params = {
					'title': title
				}
				api.setCorrect(id, params).then(res => {
					if(res.status == 201 || res.status == 200) {
						Toast('修改成功')
					}else {
						Toast('修改失败')
					}
				})
			}
		},
		// 自动获取 焦点指令
		directives:{
			focus:{
				inserted(el){
					el.focus()
				}
			}
		}
	}
</script>