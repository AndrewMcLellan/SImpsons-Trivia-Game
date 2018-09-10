class CreateRounds < ActiveRecord::Migration[5.2]
  def change
    create_table :rounds do |t|
      t.integer :total_questions, default: 10
      t.integer :total_questions_asked, default: 0
      t.integer :total_correct, default: 0
    end
  end
end
