User.create :email => 'w.yunnal@gmail.com', :password => 'willy1234', :password_confirmation => 'willy1234'


coffee_maker_role = {
  :coffee_maker => {
    :make_coffee => true  
  }
}
 
coffee_maker_role = Role.create!(
:name        => ROLE_NAME[:coffee_maker],
:title       => 'Data Entry',
:description => 'Role for data entry',
:the_role    => coffee_maker_role.to_json
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


coffee_maker = User.create :email => 'coffee_maker@gmail.com', :password => 'coffee1234', :password_confirmation => 'coffee1234'
janitor = User.create :email => 'janitor@gmail.com', :password => 'jani1234', :password_confirmation => 'jani1234'

coffee_maker.role_id = coffee_maker_role.id
coffee_maker.save 

janitor.role_id = janitor_role.id
janitor.save 

 