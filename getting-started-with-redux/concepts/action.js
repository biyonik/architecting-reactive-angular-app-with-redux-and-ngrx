const action = {
    type: 'CREATE_ITEM',
    payload: 'new item'
}

// action creattor

create = (item) => ({
    type: 'CREATE_ITEM',
    payload: item
})

create('new item')