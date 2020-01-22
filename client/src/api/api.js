
export const authAPI = {
    async signUp(data) {
        const res = await fetch('/api/auth/register', {
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const serverData = await res.json();
        
        return {res, serverData};
    },
    
    async signIn(data){
        const res = await fetch('/api/auth/login', {
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const serverData = await res.json();
        
        return {res, serverData};
    }
}

export const todoListAPI = {
    async addTask(payload, token) {
        const res = await fetch('/api/todoList/addTask', {
            method:'POST',
            body: JSON.stringify(payload),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const serverData = await res.json();
        return {res, serverData};
    },

    async getTasks(token) {
        const res = await fetch('/api/todoList/getTasks', {
            method:'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const serverData = await res.json();
        return {res, serverData};
    },

    async deleteTask(id, token) {
        const res = await fetch('/api/todoList/deleteTask', {
            method:'PUT',
            body: JSON.stringify(id),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const serverData = await res.json();
        return {res, serverData};
    },

    async editTask(id, token) {
        const res = await fetch('/api/todoList/editTask', {
            method:'POST',
            body: JSON.stringify(id),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const serverData = await res.json();
        return {res, serverData};
    },
}