from recommand import get_recommendation_top_percent as grtp
import time

start = time.time()

result = grtp(5097)

print("total time :", time.time() - start)
print(result)