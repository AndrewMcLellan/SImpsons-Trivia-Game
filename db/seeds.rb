# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


characters = [
  "Homer Simpson",
  "Bart Simpson",
  "Lisa Simpson",
  "Marge Simpson",
  "Maggie Simpson",
  "Abe Simpson",
  "Milhouse Van Houten",
  "Troy McClure",
  "Nelson Muntz",
  "Otto",
  "Dr. Nick",
  "Dr. Hibbert",
  "Patty",
  "Selma",
  "Comic Book Guy",
  "Chief Wiggum",
  "Mayor Quimby",
  "Santas Little Helper",
  "Ralph Wiggum",
  "Ned Flanders",
  "Todd Flanders",
  "Barney Gumble",
  "Moe Szyslak",
  "Lenny",
  "Carl",
  "Apu Nahasapeemapetilon",
  "Duff Man"
]


characters.each do |character|
  Character.create!(full_name: character)
end
