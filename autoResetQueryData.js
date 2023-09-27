    
    // 以下方法适用于vue  ts  项目


    import {watch} from 'vue'
    import Router from '@/router/index';
    /**
     *
     * 自动监听 并 设置参数到query +  将query参数回填到页面
     * 使用方法 ：   在需要自动回填的组件的 onmounted 生命周期中   调用getPageStatusToQuery({a})    a为组件中使用ref定义的名称
     */
    // 将query转成对象
    parseSearchParams(searchParamsString: string) {
        return searchParamsString.split('&').reduce((searchParams: any, curKV) => {
            const [k, v] = curKV.split('=').map(decodeURIComponent);
            searchParams[k] = v;
            return searchParams;
        }, {});
    },
    // 保存状态到url query
    setPageStatusToQuery(queryData: any) {
        const newQuery = {} as any
        Object.keys(queryData).map((key: any) => {
            newQuery[key] = queryData[key].value
        })
        const urlString = window.location.search;
        const urlParamsString = urlString.slice(1)
        const urlQueryData = this.parseSearchParams(urlParamsString)
        const newQueryData = {...urlQueryData, ...newQuery}
        Router.replace({query: newQueryData})
    },
    // 热更新会导致失效  热更新完需要刷新页面
    // 回填query 状态到页面中  并且自动watch & set到query中
    getPageStatusToQuery(queryData: any) {
        const urlString = window.location.search; // ?active=0
        let proxyList = [] as any
        Object.keys(queryData).map((key: string) => {
            proxyList.push(queryData[key])
        })
        // 获取query 参数
        const urlParamsString = urlString.slice(1)
        const urlQueryData = this.parseSearchParams(urlParamsString)
        let queryHasPageData = false
        Object.keys(urlQueryData).map((key: string) => {
            if (queryData[key]) {
                queryHasPageData = true
                // 根据代理类型回填
                if (typeof (queryData[key].value) === 'number') {
                    queryData[key].value = Number(urlQueryData[key])

                }
                if (typeof (queryData[key].value) === 'string') {
                    queryData[key].value = urlQueryData[key]
                }
            }
        })
        watch(proxyList, (newValue) => {
            this.setPageStatusToQuery(queryData)
        })
    },
