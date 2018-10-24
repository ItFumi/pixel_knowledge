class Favorite < ApplicationRecord
  # 1.イイネvsユーザー (多vs1) = 複数のイイネは1人のユーザーがしている。
  belongs_to :user
  # 4.イイネvs知識 (1vs多) = 複数のイイネは1つの知識に属している。
  belongs_to :knowledge
end
