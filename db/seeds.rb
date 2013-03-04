User.create :email => 'w.yunnal@gmail.com', :password => 'willy1234', :password_confirmation => 'willy1234'


data_entry_role = {
  :data_entry => {
    :button_view => true  
  }
}
 
data_entry_role = Role.create!(
:name        => ROLE_NAME[:data_entry],
:title       => 'Data Entry',
:description => 'Role for data entry',
:the_role    => data_entry_role.to_json
)

janitor_role = {
  :janitor => {
    :clean_toilet => true 
  }
}

janitor_role  = Role.create!(
:name        => ROLE_NAME[:janitor],
:title       => 'Janitor',
:description => 'Role for janitor',
:the_role    => janitor_role.to_json
)


data_entry = User.create :email => 'data_entry@gmail.com', :password => 'data1234', :password_confirmation => 'data1234'
janitor = User.create :email => 'janitor@gmail.com', :password => 'jani1234', :password_confirmation => 'jani1234'

data_entry.role_id = data_entry_role.id
data_entry.save 

janitor.role_id = janitor_role.id
janitor.save 

 