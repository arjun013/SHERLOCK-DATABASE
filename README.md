# SHERLOCK-DATABASE

used my mongodb atlas

Sign up and then Login.(two users already in atlas database. 1. admin - password: 'Admin123' 2.arjun - password: 'Arjun13')

Login as admin can access add-episodes(just checkinng session storage parameter - activeUser,assigned while log in ). Normal user can view already uploaded episodes.

Any user can give a rating out of five to an episode. The average of all ratings of an epiode will be shown as sdb rating of that episode. User can change his rating in future.

Any user can post his review or comment about a particular episode in the single episode page. He himself can remove his comment later. Admin can remove a comment by anyone.

Any user can access add character. A parameter 'approved' is assigned while uploading. approved is true only if the activeUser is admin.

Characters added by normal user will shown in admin's page as requests. He can approve , remove or customize the  data by user.

Admin can edit or delete the character data even after uploading.

The charcters listing page shows the approved character details. Others will be shown in requests field, which is only shown to admin. admin then approves characters by other users or reject them.
