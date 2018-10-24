class Comment < ApplicationRecord
  validates :content, presence: true, length: { maximum: 140 }

  # 5.コメントvsユーザー (多vs1) = 複数のコメントは1人のユーザーが投稿している。
  belongs_to :user
  # 6.コメントvs知識 (多vs1) = 複数のコメントは1つの知識に属している。
  belongs_to :knowledge
end
