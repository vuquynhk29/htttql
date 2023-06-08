from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(Accountant)
admin.site.register(Balancerec)
admin.site.register(SellBill)
admin.site.register(BuyBill)
admin.site.register(Branch)
admin.site.register(Chiefmanager)
admin.site.register(Department)
admin.site.register(Document)
admin.site.register(Employee)
admin.site.register(Investmentrec)
admin.site.register(Lendrec)
admin.site.register(Loanrec)
admin.site.register(Manager)
admin.site.register(Partner)
admin.site.register(Product)
admin.site.register(ProductSellBill)
admin.site.register(ProductBuyBill)
admin.site.register(Receipt)
admin.site.register(Salary)
admin.site.register(Salarytable)
admin.site.register(Statisticrec)
admin.site.register(Summary)
admin.site.register(Tax)
admin.site.register(User)