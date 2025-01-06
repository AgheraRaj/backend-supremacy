export const login = (req, res) => {
    const {username} = req.body;

    if(!username) {
        return res.status(400).send({message: 'Username is required'});
    }

    req.session.username = username;
    res.cookie('username', username, {httpOnly: true , maxAge: 1000*60*60*24});
    res.json({
        message: `Logged in as ${username}`,
    })
  };

export const logout = (req, res) => {
    res.clearCookie('username');
    req.session.destroy((err)=>{
        if(err) {
            res.status(500).send({err: 'Error in log out'});
        }
        res.json({
            message: `logged out`, 
        });
    });
  };