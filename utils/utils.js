export function uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function mergeUniqueMessages(arr1, arr2, maxLength) {
    var extra = [];
    for (var i in arr2) {
        if (!exist(arr1, i)) {
            extra.push(i);
        }
    }
    return arr1.concat(extra).slice(0, maxLength);
}

export function exist(arr, item) {
    for (var a in arr) {
        if (a.id == item.id) {
            return true;
        }
    }
    return false;
}

export function isPublic(item) {
    return item.public == true;
};