1. # in resetlink
when renderor file from node js then give error when loading rest sending link
example-http://localhost:5500/view/forgot_reset_password/reset_password.html?id=9c04ec88-4c0e-4050-944d-465ce310c3d3

error-Error: ENOENT: no such file or directory, stat 'C:\Users\kri82\OneDrive\Desktop\my_node_project_sharpner\expense_app_fullstack _using_api\view\forgot_reset_password\reset_password.html?id=bccb2614-bc38-426b-86f3-9710c3ad64d6'

reason - i have used query for sending reset link id to user
now node js recive the url(http://localhost:5500/view/forgot_reset_password/reset_password.html?id=9c04ec88-4c0e-4050-944d-465ce310c3d3)
which search same as in file which not exist so nodejs cant render so gives error - not found

but- it is working in another sever sucssfull,like link port 5500 of vs code,open copy path etc
because here not have render but browser do everthing which understand query also

solution -dont know