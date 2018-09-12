import { BehaviorSubject } from 'rxjs';

export const userlistService = {
    $users: new BehaviorSubject([]),
    getUsers: function () {
        return fetch('http://localhost:4000/users')
            .then(res => res.json())
            .then(data => {
                this.$users.next(data);
            });
    }
}