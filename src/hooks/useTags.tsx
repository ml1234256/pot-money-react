import { createId } from "lib/createId";
import { useEffect, useState } from "react"

export type Tag = {
    id: number,
    type: '+' | '-',
    name: string
}

export const useTags = () => {
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        let localTags = JSON.parse(window.localStorage.getItem('tags') || '[]');
        if (localTags.length === 0) {
            localTags = [
                { id: 1, type: '-', name: '餐饮' },
                { id: 2, type: '-', name: '购物' },
                { id: 3, type: '-', name: '交通' },
                { id: 4, type: '-', name: '红包' },
                { id: 5, type: '+', name: '工资' },
                { id: 6, type: '+', name: '兼职' },
                { id: 7, type: '+', name: '理财' },
            ]
        }
        setTags(localTags);
    }, []);
    useEffect(() => {
        window.localStorage.setItem('tags', JSON.stringify(tags));
    }, [tags]);
    
    const addTag = (tagName:string, type:'+'|'-') => {
        const names = tags.map(tag => tag.name);
        tagName = tagName.replace(/\s+/g, "");
        if ( tagName === '') return;
        if (names.indexOf(tagName) >= 0) {
            window.alert('标签名已存在');
        } else {
            if (tagName.length <= 4) {
                 setTags([...tags, {id: createId(), type:type, name:tagName}]);
            } else {
                window.alert('请输入小于4个字的标签名')
            }
        }
    }
    const removeTag = (id: number) => {
        setTags(tags.filter(tag => tag.id !== id));
    }
    const updateTag = (id: number, tagName: string) => {
        const names = tags.map(tag => tag.name);
        const newName = tagName.replace(/\s+/g, "");
        const needUpdateTag = tags.filter(tag => tag.id === id)[0];

        if (newName === '') return;
        if (names.indexOf(tagName) >= 0 && needUpdateTag.name !== tagName) {
            window.alert('标签名已存在');
        } else {
            if (newName.length <= 4) {
                    setTags(tags.map(tag => tag.id === id ? {id:id, type: '-', name:newName} : tag));
                } else {
                        window.alert('请输入小于4个字的标签名')
                }
        }
    
    }
    const findTagName = (id: number) => {
        return tags.filter(tag => tag.id === id)[0].name;
    }
    return {tags, setTags, addTag, removeTag, updateTag, findTagName}
}

